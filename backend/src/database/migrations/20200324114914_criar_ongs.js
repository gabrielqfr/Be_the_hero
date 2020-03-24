
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(t) {
      t.string('id').primary();
      t.string('nome').notNullable();
      t.string('email').notNullable();
      t.string('whatsapp').notNullable();
      t.string('cidade').notNullable();
      t.string('UF', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
