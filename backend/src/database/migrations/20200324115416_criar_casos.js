
exports.up = function(knex) {
    return knex.schema.createTable('casos', function(t) {
        t.increments();
        t.string('titulo').notNullable();
        t.string('descricao').notNullable();
        t.decimal('valor').notNullable();

        t.string('ong_id').notNullable();

        t.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('casos');
};
