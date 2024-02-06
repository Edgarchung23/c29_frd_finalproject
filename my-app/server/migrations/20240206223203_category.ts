import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("category", (table) => {
        table.increments("id").primary();
        table.string("category_name").notNullable();
        table.decimal("deposit_charge", 10, 2);
        table.decimal("rent_charge", 10, 2);
        table.enum("type", ["single", "multiple"]).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("category");
}