import Table from "cli-table3";
const table = new Table({
  head: ["id", "status", "description", "createdAt", "updatedAt"],
});

export default function renderTable(mongoDB_data) {
  const tableRows = mongoDB_data.map((doc) => [
    doc._id,
    doc.status,
    doc.description,
    doc.createdAt ? doc.createdAt.toLocaleDateString() : "N/A",
    doc.updatedAt ? doc.updatedAt.toLocaleDateString() : "N/A",
  ]);
  table.push(...tableRows);
  console.log(table.toString());
}
