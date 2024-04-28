import moment from 'moment'

export default {
  methods: {
    dateParse(value, format) {
      return moment(value, format).toDate()
    },
    dateFormat(value, format) {
      return moment(value).format(format)
    }
  }
}
