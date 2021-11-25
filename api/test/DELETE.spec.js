import chai from 'chai'
import chaiHttp from 'chai-http'
import { it } from 'mocha';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;


describe('DELETE', () => {

    context('Quando Apago uma tarefa', () => {

        let task = {
            _id: require('mongoose').Types.ObjectId(),
            title: 'Pagar conta do celular',
            owner: 'Isaias',
            done: false
        }

        before((done) => {
            tasksModel.insertMany([task])
            done();
        })

        it('Deve retornar 200', (done) => {
            request.delete('/task/' + task._id)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({})
                
                    done();
                })

        });


        after((done) => {
            request.get('/task/' + task._id)
                .end((err,res) => {
                    expect(res).to.have.status(404)
                    done();
                })
        })


    })

    context('Quando a tarefa não existe', () => {

        it('Deve retornar 200', (done) => {
            let id = require('mongoose').Types.ObjectId();
            request
            .delete('/task/' + id)
            .end((err,res) => {
                expect(res).to.have.status(404)
                expect(res.body).to.eql({})
                done();
            })
        });

    })

})