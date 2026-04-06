const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { authenticate } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

const ALLOWED_IMAGES = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const ALLOWED_FILES = [...ALLOWED_IMAGES, '.pdf', '.zip', '.doc', '.docx', '.mp4', '.mov'];

const uploadImage = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    ALLOWED_IMAGES.includes(ext) ? cb(null, true) : cb(new Error('Only image files allowed'));
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB for deliverables
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    ALLOWED_FILES.includes(ext) ? cb(null, true) : cb(new Error('File type not allowed'));
  },
});

function fileUrl(filename) {
  return `/uploads/${filename}`;
}

// ── POST /api/upload/image ──────────────────────────────────────────────────
router.post('/image', authenticate, uploadImage.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: fileUrl(req.file.filename), filename: req.file.filename });
});

// ── POST /api/upload/images  — multiple ────────────────────────────────────
router.post('/images', authenticate, uploadImage.array('files', 5), (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'No files uploaded' });
  res.json(req.files.map((f) => ({ url: fileUrl(f.filename), filename: f.filename })));
});

// ── POST /api/upload/file  — delivery file ─────────────────────────────────
router.post('/file', authenticate, uploadFile.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: fileUrl(req.file.filename), filename: req.file.originalname, size: req.file.size });
});

module.exports = router;
