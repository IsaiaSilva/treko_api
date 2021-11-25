import chai from 'chai'
import chaiHttp from 'chai-http'
import { it } from 'mocha';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('GET', () => {

    /*   before((done) => {
          tasksModel.deleteMany({});
          done();
      }) 
      */

    context('Quando eu tenho tarefas cadastradas', () => {

        before((done) => {
            let tasks = [
                { title: 'Estudar MongoDB', owner: 'Isaias', done: false },
                { title: 'Comprar Fralda da Bebe', owner: 'Isaias', done: false },
                { title: 'Dar Banho no Doguinho', owner: 'Anderson', done: true },
                { title: 'Estudar API Rest com Cypress e NodeJs', owner: 'Germano', done: false },
            ]

            tasksModel.insertMany(tasks)
            done();
        })

        it('Deve retornar uma lista', (done) => {
            request.get('/task')
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    //console.log(typeof res.body.data);
                    //console.log(res.body.data);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        })

        it('Deve filtrar por uma palavra chave', (done) => {
            request.get('/task')
                .query({ title: 'Estudar' })
                .end((err, res) => {
                    expect(res).to.has.status(200);
                   // console.log(res.body.data[0])
                   // console.log(res.body.data[1])
                    expect(res.body.data[0].title).to.equal('Estudar API Rest com Cypress e NodeJs')
                    expect(res.body.data[1].title).to.equal('Estudar MongoDB')


                    done();
                })
        })

    })

    context('Quando busco por id', () => {

        it('deve retornar uma única tarefa', (done) => {
            let tasks = [
                { title: 'Ler um livro de Javascript', owner: 'isaias@gmail.com', done: false },
            ]

            //recuperar o ID
            tasksModel.insertMany(tasks, (err, result) => {
                let id = result[0]._id
                request.get('/task/' + id)
                    .end((err, res) => {
                        expect(res).to.has.status(200);
                        expect(res.body.data.title).to.equal('Ler um livro de Javascript')
                        expect(res.body.data.title).to.equal(tasks[0].title)
                        done();
                    })
            });

        });
    })

    context('Quando a tarefa não existe ou ID é inválido', () => {

        it('deve retornar 404', (done) => {
            let id = require('mongoose').Types.ObjectId(); //TypeObj é o objeto do mongo q cria o ID
            request.get('/task/' + id)
                .end((err, res) => {
                    expect(res).to.has.status(404);
                    expect(res.body).to.eql({});
                    done();

                });

        });
    })


})
