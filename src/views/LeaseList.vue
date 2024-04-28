<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
                <h1 class="mb-0">Leases</h1>
              </CCol>
              <CCol class="text-end">
                <CButton color="primary" variant="outline" @click="goToCreateLease">
                  Add
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">Tenant Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">Apartment Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">Lease Start Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">Lease End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">Rent Amount</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="lease in leases" :key="lease.id" @click="goToLeaseDetail(lease.id)">
                  <CTableDataCell>{{ lease.tenant.first_name }} {{ lease.tenant.last_name }}</CTableDataCell>
                  <CTableDataCell class="text-center">{{ lease.apartment.apartment_number }}</CTableDataCell>
                  <CTableDataCell class="text-center">{{ dateFormat(dateParse(lease.lease_start_date, 'YYYY-MM-DD'), 'MMM, YYYY') }}</CTableDataCell>
                  <CTableDataCell class="text-center">{{ dateFormat(dateParse(lease.lease_end_date, 'YYYY-MM-DD'), 'MMM, YYYY') }}</CTableDataCell>
                  <CTableDataCell class="text-center">${{ lease.rent_amount }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
/* global process */
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton } from '@coreui/vue'
import dateMixin from "../mixins/dateMixin";

export default {
  mixins: [dateMixin],
  components: {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton
  },
  data() {
    return {
      leases: []
    }
  },
  created() {
    axios.get(`${process.env.VUE_APP_BASE_URL}/lease/`)
      .then(response => {
        this.leases = response.data
      })
  },
  methods: {
    goToLeaseDetail(leaseId) {
      this.$router.push(`/leases/${leaseId}`);
    },
    goToCreateLease() {
      this.$router.push('/create-lease')
    },
  }
}
</script>
