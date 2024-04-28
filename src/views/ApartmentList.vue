<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
                <h1 class="mb-0">Apartments</h1>
              </CCol>
              <CCol class="text-end">
                <CButton color="primary" variant="outline" @click="goToCreateApartment">
                  Add
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">Apartment Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">Rent Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">Security Deposit Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">Availability</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="apartment in apartments" :key="apartment.id" @click="goToApartmentDetail(apartment.id)">
                  <CTableDataCell>{{ apartment.address }}</CTableDataCell>
                  <CTableDataCell class="text-center">{{ apartment.apartment_number }}</CTableDataCell>
                  <CTableDataCell class="text-center">${{ apartment.rent_amount }}</CTableDataCell>
                  <CTableDataCell class="text-center">${{ apartment.security_deposit_amount }}</CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CIcon :name="apartment.apartment_status ? 'cil-check' : 'cil-x'" size="lg" />
                  </CTableDataCell>
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
import { CIcon } from '@coreui/icons-vue'
export default {
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
    CIcon,
    CButton
  },
  data() {
    return {
      apartments: []
    }
  },
  created() {
    axios.get(`${process.env.VUE_APP_BASE_URL}/apartments/`)
      .then(response => {
        this.apartments = response.data
      })
  },
  methods: {
    goToApartmentDetail(apartmentId) {
      this.$router.push(`/apartments/${apartmentId}`);
    },
    goToCreateApartment() {
    this.$router.push('/create-apartment')
  },
  }
}
</script>
