<template>
  <CContainer>
    <CRow>
      <CCol cols="6">
        <CCard>
          <CCardHeader>
            <h1 class="mb-0">Create Apartment</h1>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="createApartment">
              <CFormLabel class="mt-1">Address</CFormLabel>
              <CFormInput type="text" v-model="apartment.address" required />

              <CFormLabel class="mt-1">Apartment Number</CFormLabel>
              <CFormInput type="text" v-model="apartment.apartment_number" required />

              <CFormLabel class="mt-1">Floor Number</CFormLabel>
              <CFormInput type="number" v-model="apartment.floor_number" required />

              <CFormLabel class="mt-1">Square Footage</CFormLabel>
              <CFormInput type="number" v-model="apartment.square_footage" required />

              <CFormLabel class="mt-1">Number of Bedrooms</CFormLabel>
              <CFormInput type="number" v-model="apartment.no_of_bedrooms" required />

              <CFormLabel class="mt-1">Number of Bathrooms</CFormLabel>
              <CFormInput type="number" v-model="apartment.no_of_bathrooms" required />

              <CFormLabel class="mt-1">Rent Amount</CFormLabel>
              <CFormInput type="number" v-model="apartment.rent_amount" required />

              <CFormLabel class="mt-1">Security Deposit Amount</CFormLabel>
              <CFormInput type="number" v-model="apartment.security_deposit_amount" required />

              <CFormLabel class="mt-1">Pet Policy</CFormLabel>
              <CFormInput type="text" v-model="apartment.pet_policy" required />

              <CFormLabel class="mt-1">Parking Fee</CFormLabel>
              <CFormInput type="number" v-model="apartment.parking_fee" required />

              <CFormLabel class="mt-1">Apartment Status</CFormLabel>
              <CFormSwitch v-model="apartment.apartment_status" required />

              <CButton type="submit" class="mt-3" color="primary">Create Apartment</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
/* global process */
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormInput,
  CRow,
  CFormSwitch
} from '@coreui/vue'

export default {
  components: {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm,
    CFormLabel,
    CFormInput,
    CFormSwitch,
    CRow
  },
  data() {
    return {
      apartment: {
        address: '',
        apartment_number: '',
        floor_number: 0,
        square_footage: 0,
        no_of_bedrooms: 0,
        no_of_bathrooms: 0,
        rent_amount: '',
        security_deposit_amount: '',
        pet_policy: '',
        parking_fee: '',
        apartment_status: false
      }
    }
  },
  methods: {
    createApartment() {
      axios.post(`${process.env.VUE_APP_BASE_URL}/apartments/`, this.apartment)
        .then(response => {
          const apartmentId = response.data.id;
          this.$router.push(`/apartments/${apartmentId}`);
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
