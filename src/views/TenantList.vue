<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
                <h1 class="mb-0">Tenants</h1>
              </CCol>
              <CCol class="text-end">
                <CButton color="primary" variant="outline" @click="goToCreateTenant">
                  Add
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary">First Name</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary">Last Name</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary">Apartment</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary">Lease Start</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary">Lease End</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary">Rent Amount</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary">Contact</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="tenant in tenants" :key="tenant.id" @click="goToTenantDetail(tenant.id)">
                  <CTableDataCell>{{ tenant.first_name }}</CTableDataCell>
                  <CTableDataCell>{{ tenant.last_name }}</CTableDataCell>
                  <CTableDataCell>{{ tenant.apartment_number }}</CTableDataCell>
                  <CTableDataCell>{{ tenant.lease_start_date }}</CTableDataCell>
                  <CTableDataCell>{{ tenant.lease_end_date }}</CTableDataCell>
                  <CTableDataCell>{{ tenant.rent_amount }}</CTableDataCell>
                  <CTableDataCell>{{ tenant.email }}</CTableDataCell>
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
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/vue'
import { CButton } from "@coreui/vue/dist/esm/components/button";
import { CIcon } from '@coreui/icons-vue'

export default {
  components: {
    CButton,
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
  },
  data() {
    return {
      tenants: []
    }
  },
  created() {
    axios.get(`${process.env.VUE_APP_BASE_URL}/tenant-info/`)
      .then(response => {
        this.tenants = response.data
      })
  },
  methods: {
    goToTenantDetail(tenantId) {
      this.$router.push(`/tenant-detail/${tenantId}`)
    },
    goToCreateTenant() {
      this.$router.push('/create-tenant')
    }
  }
}
</script>
