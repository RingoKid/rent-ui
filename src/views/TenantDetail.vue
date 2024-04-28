<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
                <h1 class="mb-0">{{ tenant.first_name }} {{ tenant.last_name }}</h1>
              </CCol>
              <CCol class="text-end">
                <CRow class="align-items-center justify-content-end">
                  <CCol sm="auto">
                    <CDropdown variant="btn-group">
                      <CDropdownToggle color="light" :caret="false">
                        <CIcon name="cil-settings" />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem @click="goToUpdateTenant(tenant.id)">Update</CDropdownItem>
                        <CDropdownItem @click="showDeleteConfirmation">Delete</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                  <CCol sm="auto">
                    <h1 class="mb-0">{{ tenant.apartment_number }}</h1>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <p><strong>Phone:</strong> {{ tenant.phone }}</p>
                <p><strong>Lease Start:</strong> {{ tenant.lease_start_date }}</p>
                <p><strong>Date of Birth:</strong> {{ tenant.date_of_birth }}</p>
                <p><strong>Identification Number:</strong> {{ tenant.identification_number }}</p>
              </CCol>
              <CCol>
                <p><strong>Rent Amount:</strong> ${{ tenant.rent_amount }}</p>
                <p><strong>Lease End:</strong> {{ tenant.lease_end_date }}</p>
                <p><strong>Move In Date:</strong> {{ tenant.move_in_date }}</p>
                <p><strong>Move Out Date:</strong> {{ tenant.move_out_date }}</p>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <p><strong>Contact:</strong> {{ tenant.email }}</p>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CModal
  :visible="showModal"
  @close="() => { showModal = false }"
  aria-labelledby="LiveDemoExampleLabel"
>
  <CModalHeader>
    <CModalTitle id="LiveDemoExampleLabel">Delete Tenant</CModalTitle>
  </CModalHeader>
  <CModalBody>
    Are you sure you want to delete the tenant {{ tenant.first_name }} {{ tenant.last_name }}?
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" @click="() => { showModal = false }">
      Cancel
    </CButton>
    <CButton color="primary" @click="deleteTenant">
      Confirm
    </CButton>
  </CModalFooter>
</CModal>

  </CContainer>
</template>

<script>
/* global process */
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/vue'
import {CModal, CModalBody, CModalFooter, CModalHeader} from '@coreui/vue';
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/vue/dist/esm/components/dropdown";
import {CModalTitle} from "@coreui/vue/dist/esm/components/modal";

export default {
  components: {
    CModalTitle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CDropdown,
    CButton,
    CModalFooter,
    CModalBody,
    CModalHeader,
    CModal,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow
  },
  data() {
    return {
      showModal: false,
      tenant: {}
    }
  },
  created() {
    const tenantId = this.$route.params.tenant_id
    console.log(tenantId)
    axios.get(`${process.env.VUE_APP_BASE_URL}/tenant-detail/${tenantId}/`)
      .then(response => {
        console.log(response.data)
        this.tenant = response.data
      })
  },
  methods: {
    showDeleteConfirmation() {
      this.showModal = true;
      console.log('showModal:', this.showModal);
    },
    deleteTenant() {
      axios.delete(`${process.env.VUE_APP_BASE_URL}/tenants/${this.tenant.id}`)
        .then(() => {
          this.$router.push('/tenants')
        })
        .catch(error => {
          console.error(error)
        })
    },
    goToUpdateTenant(tenantId) {
      this.$router.push({ name: 'UpdateTenant', params: { tenant_id: tenantId } });
    },
  }
}
</script>
