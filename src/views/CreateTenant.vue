<template>
  <CContainer>
    <CRow>
      <CCol cols="6">
        <CCard>
          <CCardHeader>
            <h1 class="mb-0">Create Tenant</h1>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="createTenant">
              <CFormLabel>First Name</CFormLabel>
              <CFormInput type="text" v-model="tenant.first_name" required />

              <CFormLabel>Last Name</CFormLabel>
              <CFormInput type="text" v-model="tenant.last_name" required />

              <CFormLabel>Email</CFormLabel>
              <CFormInput type="email" v-model="tenant.email" required />

              <CFormLabel>Phone</CFormLabel>
              <CFormInput type="tel" v-model="tenant.phone" required />

              <CFormLabel>Date of Birth</CFormLabel>
              <CFormInput type="date" v-model="tenant.date_of_birth" required />

              <CFormLabel>Identification Number</CFormLabel>
              <CFormInput type="text" v-model="tenant.identification_number" required />

              <CFormLabel>Move In Date</CFormLabel>
              <CFormInput type="date" v-model="tenant.move_in_date" required />

              <CButton type="submit" class="mt-3" color="primary">Create Tenant</CButton>
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
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormLabel, CRow } from '@coreui/vue'
import {CFormInput} from "@coreui/vue/dist/esm/components/form";

export default {
  components: {
    CFormInput,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm,
    CFormLabel,
    CRow
  },
  data() {
    return {
      tenant: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        identification_number: '',
        move_in_date: ''
      }
    }
  },
  methods: {
    createTenant() {
      axios.post(`${process.env.VUE_APP_BASE_URL}/tenants/`, this.tenant)
        .then(response => {
          const tenantId = response.data.id;
          this.$router.push(`/tenant-detail/${tenantId}`);
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
