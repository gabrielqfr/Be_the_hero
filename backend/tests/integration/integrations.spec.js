// Import das variaveis necessárias para test
const request = require('supertest');
const app = require('../../src/app');
const conexoes = require('../../src/database/conexoes');
let idOngTeste = '';
let idCasoTeste = '';

//Testes do ONGController
describe('Testes OngController', () => {
    //Criação das tabelas para teste
    beforeAll( async () =>{
        await conexoes.migrate.rollback();
    })
    beforeEach( async () => {
        await conexoes.migrate.latest();
    });
    //Drop da conexão com o banco ao final do teste
    afterAll( async () => {
        await conexoes.destroy();
    })
    //Teste de criação de ONG
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                nome: "Cat lovers",
                email: "cat@cat.com",
                whatsapp: "62992500132",
                cidade: "Goiânia",
                UF: "GO"
            });
        idOngTeste = response.body.id;
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
    //Teste de criação de caso
    it('should be able to create a new Caso', async () => {
        const response = await request(app)
            .post('/casos')
            .set('Authorization', idOngTeste)
            .send({
                titulo: "Caso teste jest supertest",
                descricao: "Descrição exemplo de teste",
                valor: 250
            })
            .expect(200)

            idCasoTeste = response.body.id;
    });
    //Teste de listagem de casos
    it('should be able to list Casos', async () => {
        await request(app)
            .get('/casos')
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });
    //Teste de listagem de casos de uma ONG específica
    it('should be able to list Casos of a ONG', async () => {
        await request(app)
            .get('/perfil')
            .send()
            .set('authorization', idOngTeste)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });
    //Teste de delete de caso
    it('should be able to delete a Caso', async () => {
        await request(app)
            .delete(`/casos/${idCasoTeste}`)
            .set('authorization', idOngTeste)
            .expect(204);
    });
    //Teste de listagem de ONGs
    it('should be able to list all the ONGs', async () => {
        await request(app)
            .get('/ongs')
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [{
                id: idOngTeste,
                nome: "Cat lovers",
                email: "cat@cat.com",
                whatsapp: "62992500132",
                cidade: "Goiânia",
                UF: "GO"
            }]);
    });
    //Teste de delete de ONGs
    it('should be able to delete an ONG', async () => {
        await request(app)
            .delete(`/ongs/${idOngTeste}`)
            .set('authorization', idOngTeste)
            .expect(204);
    });
});