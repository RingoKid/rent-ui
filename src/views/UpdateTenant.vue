<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Update Tenant</h1>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="updateTenant">
              <CFormInput type="text" label="First Name" v-model="tenant.first_name" />
              <CFormInput type="text" label="Last Name" v-model="tenant.last_name" />
              <CFormInput type="email" label="Email" v-model="tenant.email" />
              <CFormInput type="tel" label="Phone" v-model="tenant.phone" />
              <CFormInput type="date" label="Date of Birth" v-model="tenant.date_of_birth" />
              <CFormInput type="text" label="Identification Number" v-model="tenant.identification_number" />
              <CFormInput type="date" label="Move In Date" v-model="tenant.move_in_date" />
              <CFormInput type="date" label="Move Out Date" v-model="tenant.move_out_date" />
              <CButton type="submit" color="primary">Update</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CForm, CFormInput, CButton } from '@coreui/vue'
/* global process */

export default {
  components: {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CForm,
    CFormInput,
    CButton
  },
  data() {
    return {
      tenant: {}
    }
  },
  created() {
    const tenantId = this.$route.params.tenant_id
    axios.get(`${process.env.VUE_APP_BASE_URL}/tenant-detail/${tenantId}/`)
      .then(response => {
        this.tenant = response.data
      })
  },
  methods: {
    updateTenant() {
      axios.put(`${process.env.VUE_APP_BASE_URL}/tenants/${this.tenant.id}/`, this.tenant)
        .then(() => {
          this.$router.push('/tenants')
        })
        .catch(error => {
          console.error(error)
        })
    },
  }
}
</script>
