import chai from 'chai'
import chaiHttp from 'chai-http'
import { it } from 'mocha';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;


describe('PUT', () => {

    context('Quando Alterar uma Tarefa', () => {

        let task = {
            _id: require('mongoose').Types.ObjectId(),
            title: 'Comprar Fandangos',
            owner: 'Isaias',
            done: false
        }

        before((done) => {
            tasksModel.insertMany([task])
            done();
        })

        it('Deve retornar 200', (done) => {
            task.title = 'Comprar Nutella Alterado',
                task.done = true
            request.put('/task/' + task._id)
                .send(task)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({})
                    console.log(res.body)
                    done();
                })

        });

        it('Deve retornar os dados atualizados', (done) => {
            request.get('/task/' + task._id)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.data.title).to.eql(task.title)
                    expect(res.body.data.done).to.be.true

                    done();
                })
        });

    })

})