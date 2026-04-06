const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { query } = require('./db/pool');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    },
  });

  // Auth middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Unauthorized'));
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const { rows } = await query('SELECT id, full_name, avatar_url FROM users WHERE id=$1 AND is_active=TRUE', [payload.sub]);
      if (!rows.length) return next(new Error('User not found'));
      socket.user = rows[0];
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    console.log(`Socket connected: ${socket.user.full_name} (${userId})`);

    // Join personal room
    socket.join(`user:${userId}`);

    // ── Join order room ──────────────────────────────────────────────────────
    socket.on('order:join', async (orderId) => {
      const { rows } = await query(
        'SELECT id FROM orders WHERE id=$1 AND (buyer_id=$2 OR seller_id=$2)',
        [orderId, userId]
      );
      if (rows.length) {
        socket.join(`order:${orderId}`);
        socket.emit('order:joined', orderId);
      }
    });

    // ── Send message ─────────────────────────────────────────────────────────
    socket.on('message:send', async ({ orderId, receiverId, content, fileUrl, fileName }) => {
      if (!content?.trim() && !fileUrl) return;

      try {
        const { rows } = await query(`
          INSERT INTO messages (order_id, sender_id, receiver_id, content, file_url, file_name)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `, [orderId || null, userId, receiverId, content?.trim() || '', fileUrl || null, fileName || null]);

        const msg = {
          ...rows[0],
          sender_name: socket.user.full_name,
          sender_avatar: socket.user.avatar_url,
        };

        // Emit to order room or individual user
        if (orderId) {
          io.to(`order:${orderId}`).emit('message:new', msg);
        } else {
          io.to(`user:${receiverId}`).emit('message:new', msg);
          socket.emit('message:new', msg);
        }

        // Mark notification for receiver
        io.to(`user:${receiverId}`).emit('notification:message', {
          from: socket.user.full_name,
          orderId,
          preview: content?.slice(0, 60),
        });
      } catch (err) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // ── Typing indicator ─────────────────────────────────────────────────────
    socket.on('message:typing', ({ orderId, receiverId }) => {
      if (orderId) {
        socket.to(`order:${orderId}`).emit('message:typing', { userId, orderId });
      } else {
        io.to(`user:${receiverId}`).emit('message:typing', { userId });
      }
    });

    // ── Mark messages read ───────────────────────────────────────────────────
    socket.on('message:read', async ({ senderId }) => {
      await query(
        'UPDATE messages SET is_read=TRUE WHERE receiver_id=$1 AND sender_id=$2 AND is_read=FALSE',
        [userId, senderId]
      );
      io.to(`user:${senderId}`).emit('message:read', { by: userId });
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.user.full_name}`);
    });
  });

  console.log('✅ Socket.io initialised');
  return io;
}

function getIO() {
  if (!io) throw new Error('Socket.io not initialised');
  return io;
}

module.exports = { initSocket, getIO };
