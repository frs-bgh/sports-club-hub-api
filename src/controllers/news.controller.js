const { prisma } = require("../prisma");

async function listNews(req, res) {
  const limitRaw = parseInt(req.query.limit ?? "10", 10);
  const offsetRaw = parseInt(req.query.offset ?? "0", 10);
  const search = (req.query.search ?? "").trim();

  if (Number.isNaN(limitRaw) || Number.isNaN(offsetRaw) || limitRaw < 1 || offsetRaw < 0) {
    return res.status(400).json({ message: "invalid limit/offset" });
  }

  const limit = Math.min(limitRaw, 50);
  const offset = offsetRaw;

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      }
    : undefined;

  const [total, items] = await Promise.all([
    prisma.newsPost.count({ where }),
    prisma.newsPost.findMany({ where, take: limit, skip: offset, orderBy: { publishedAt: "desc" } }),
  ]);

  res.json({ limit, offset, total, count: items.length, items });
}

async function getNews(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "invalid id" });

  const item = await prisma.newsPost.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: "news not found" });

  res.json(item);
}

async function createNews(req, res) {
  const data = { ...req.body };
  if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);

  const created = await prisma.newsPost.create({ data });
  res.status(201).json(created);
}

async function updateNews(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "invalid id" });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "body cannot be empty" });
  }

  const exists = await prisma.newsPost.findUnique({ where: { id } });
  if (!exists) return res.status(404).json({ message: "news not found" });

  const data = { ...req.body };
  if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);

  const updated = await prisma.newsPost.update({ where: { id }, data });
  res.json(updated);
}

async function deleteNews(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "invalid id" });

  const exists = await prisma.newsPost.findUnique({ where: { id } });
  if (!exists) return res.status(404).json({ message: "news not found" });

  await prisma.newsPost.delete({ where: { id } });
  res.status(204).send();
}

module.exports = { listNews, getNews, createNews, updateNews, deleteNews };