const { NUMBER } = require('./config')
const moment = require('moment')

const data = [
  {
    key: '1',
    name: 'Janson Seah',
    startTime: moment()
      .add(-1, 'd')
      .format('ddd, MMM DD, h:mm:ss a'),
    endTime: moment()
      .add(-1, 'd')
      .add(3, 'h')
      .format('ddd, MMM DD, h:mm:ss a'),
    rate: '$13.50',
    cost: '$40.50',
    paid: 'Yes',
    phoneNumber: '',
  },
  {
    key: '2',
    name: 'Huang Yixuan',
    startTime: moment()
      .add(-1, 'd')
      .add(1, 'h')
      .format('ddd, MMM DD, h:mm:ss a'),
    endTime: moment()
      .add(-1, 'd')
      .add(4, 'h')
      .format('ddd, MMM DD, h:mm:ss a'),
    rate: '$13.50',
    cost: '$40.50',
    paid: 'Yes',
    phoneNumber: '',
  },
  {
    key: '3',
    name: 'Lee Kai Yi',
    startTime: moment()
      .add(-1, 'd')
      .add(1, 'h')
      .format('ddd, MMM DD, h:mm:ss a'),
    endTime: moment()
      .add(-1, 'd')
      .add(7, 'h')
      .format('ddd, MMM DD, h:mm:ss a'),
    rate: '$13.50',
    cost: '$81.00',
    paid: 'Yes',
    phoneNumber: '',
  },
  {
    key: '4',
    name: 'Jeremy Hon',
    startTime: '',
    endTime: '',
    rate: '$13.50',
    cost: '',
    paid: '',
    phoneNumber: NUMBER,
  },
]

module.exports = {
  data,
}
