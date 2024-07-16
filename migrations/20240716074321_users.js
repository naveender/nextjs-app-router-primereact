/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('fname').notNullable();
        table.string('lname').notNullable();
        table.string('email', 191).notNullable().unique('users_email_unique');
        table.string('password').notNullable();
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('zipcode').notNullable();
        table.string('phone').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
