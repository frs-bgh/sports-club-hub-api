const { prisma } = require("../prisma");

async function listMembers(req, res) {
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
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
        ],
      }
    : undefined;

  const [total, items] = await Promise.all([
    prisma.member.count({ where }),
    prisma.member.findMany({ where, take: limit, skip: offset, orderBy: { id: "asc" } }),
  ]);

  res.json({ limit, offset, total, count: items.length, items });
}

async function getMember(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "invalid id" });

  const item = await prisma.member.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: "member not found" });

  res.json(item);
}

async function createMember(req, res) {
  const created = await prisma.member.create({ data: req.body });
  res.status(201).json(created);
}

async function updateMember(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "invalid id" });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "body cannot be empty" });
  }

  const exists = await prisma.member.findUnique({ where: { id } });
  if (!exists) return res.status(404).json({ message: "member not found" });

  const updated = await prisma.member.update({ where: { id }, data: req.body });
  res.json(updated);
}

async function deleteMember(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "invalid id" });

  const exists = await prisma.member.findUnique({ where: { id } });
  if (!exists) return res.status(404).json({ message: "member not found" });

  await prisma.member.delete({ where: { id } });
  res.status(204).send();
}

module.exports = { listMembers, getMember, createMember, updateMember, deleteMember };