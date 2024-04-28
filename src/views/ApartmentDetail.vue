<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
                <h1 class="mb-0">{{ apartment.address }}</h1>
              </CCol>
              <CCol class="text-end">
                <CRow class="align-items-center justify-content-end">
                  <CCol sm="auto">
                    <CDropdown variant="btn-group">
                      <CDropdownToggle color="light" :caret="false">
                        <CIcon name="cil-settings" />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem @click="goToUpdateApartment(apartment.id)">Update</CDropdownItem>
                        <CDropdownItem @click="showDeleteApartmentConfirmation">Delete</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <p><strong>Apartment Number:</strong> {{ apartment.apartment_number }}</p>
            <p><strong>Rent Amount:</strong> ${{ apartment.rent_amount }}</p>
            <p><strong>Security Deposit Amount:</strong> ${{ apartment.security_deposit_amount }}</p>
            <p><strong>Availability:</strong> {{ apartment.apartment_status ? 'Available' : 'Not Available' }}</p>
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
        <CModalTitle id="LiveDemoExampleLabel">Delete Apartment</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete the apartment at {{ apartment.address }}?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { showModal = false }">
          Cancel
        </CButton>
        <CButton color="primary" @click="deleteApartment">
          Confirm
        </CButton>
      </CModalFooter>
    </CModal>

  </CContainer>
</template>

<script>
/* global process */
import axios from 'axios'
import { CIcon } from '@coreui/icons-vue'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/vue'
import {CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/vue/dist/esm/components/modal";
import {CButton} from "@coreui/vue/dist/esm/components/button";

export default {
  components: {
    CModal,
    CModalTitle,
    CModalHeader,
    CButton,
    CModalFooter,
    CModalBody,
    CIcon,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem
  },
  data() {
    return {
      showModal: false,
      apartment: {}
    }
  },
  created() {
    const apartmentId = this.$route.params.apartment_id
    axios.get(`${process.env.VUE_APP_BASE_URL}/apartments/${apartmentId}/`)
      .then(response => {
        this.apartment = response.data
      })
  },
  methods: {
    goToUpdateApartment(apartmentId) {
      this.$router.push(`/update-apartment/${apartmentId}`);
    },
    showDeleteApartmentConfirmation() {
      this.showModal = true
    },
    deleteApartment() {
      axios.delete(`${process.env.VUE_APP_BASE_URL}/apartments/${this.apartment.id}/`)
        .then(() => {
          this.$router.push('/apartments')
        })
    }
  }
}
</script>
