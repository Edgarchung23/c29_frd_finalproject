import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("donate_items", (table) => {
    table.increments("id").primary();
    table.string("item_name");
    table.integer("deposit_charge");
    table.integer("rent_charge");
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories");
      table.string("image");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("donate_items");
}
