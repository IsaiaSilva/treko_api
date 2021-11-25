import chai from 'chai'
import chaiHttp from 'chai-http'
import { it } from 'mocha';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;


describe('POST', () => {

    context('Quando cadastro uma tarefa', () => {

        //Montando o body da tarefa
        let task = { title: 'Estudar Mongoose', owner: 'isaias@gmail.com', done: false }    //Mongoose - framework js do mongo responsavel pela persistência dos dados

        it('Então deve cadastrar com sucesso e retornar 200', (done) => {                  //Calback - done, sempre necessário nos ITs
            request.post('/task')
                .send(task)
                .end((err, res) => {                                        //Arrow Function necessario
                    expect(res).to.has.status(200);

                    //Validando o contrato da API através da Tipagem de Dados.
                    expect(res.body.data.title).to.an('string')
                    expect(res.body.data.owner).to.an('string')
                    expect(res.body.data.done).to.an('boolean')

                    done();
                })
        });
    })

    context('Quando não informo o titulo da Tarefa (campos obrigatórios)', () => {

        //Retornando titulo em branco na Massa de testes
        let task = { title: '', owner: 'isaias@gmail.com', done: false }

        it('Então deve Retornar 400', (done) => {
            request.post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(400)
                    //console.log(res.status)
                    expect(res.body.errors.title.message).to.eql('Oops! Title is required')

                    done();
                })
        });
    })

    context('Quando não informo o Dono(owner) da Tarefa (campos obrigatórios)', () => {

        //Retornando titulo em branco na Massa de testes
        let task = { title: 'Nova Tarefa', owner: '', done: false }

        it('Então deve Retornar 400', (done) => {
            request.post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(400)
                    //console.log(res.status)
                    expect(res.body.errors.owner.message).to.eql('Oops! Owner is required')

                    done();
                })
        });
    })

    //Regra de Negócio ( unique: true) Título deve ser único
    context('Quando a tarefa já existe', () => {
        let task = { title: 'Planejar viagem para EUA', owner: 'Isaias', done: false }

        before((done) => {
            request.post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    done();
                })
        })

        it('Deve retornar 409', (done) => {
            request.post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(409)
                    //console.log(res.body)
                    expect(res.body.name).to.include('Error') //não tem o errmsg no retorno do console.log

                    done();
                })
        });
    })

})