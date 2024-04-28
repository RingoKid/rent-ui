<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1 class="mb-0">Lease Details</h1>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <p v-if="lease.tenant"><strong>Tenant:</strong> {{ lease.tenant.first_name }} {{ lease.tenant.last_name }}</p>
                <p v-if="lease.apartment"><strong>Apartment:</strong> {{ lease.apartment.address }}, {{ lease.apartment.apartment_number }}</p>
                <p><strong>Lease Start Date:</strong> {{ dateFormat(dateParse(lease.lease_start_date, 'YYYY-MM-DD'), 'MMM, YYYY') }}</p>
                <p><strong>Lease End Date:</strong> {{ dateFormat(dateParse(lease.lease_end_date, 'YYYY-MM-DD'), 'MMM, YYYY') }}</p>
              </CCol>
              <CCol>
                <p><strong>Rent Amount:</strong> ${{ lease.rent_amount }}</p>
                <p><strong>Security Deposit:</strong> ${{ lease.security_deposit }}</p>
                <p><strong>Lease Term:</strong> {{ lease.lease_term }} month(s)</p>
                <p><strong>Renewal Options:</strong> {{ lease.renewal_options ? 'Yes' : 'No' }}</p>
                <p><strong>Lease Status:</strong> {{ lease.lease_status }}</p>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<!-- existing script tag -->

<script>
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/vue'
import dateMixin from "../mixins/dateMixin";

export default {
  mixins: [dateMixin],
  components: {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow
  },
  data() {
    return {
      lease: {}
    }
  },
  created() {
    const leaseId = this.$route.params.id;
    // eslint-disable-next-line no-undef
    axios.get(`${process.env.VUE_APP_BASE_URL}/lease/${leaseId}`)
      .then(response => {
        this.lease = response.data
      })
  }
}
</script>
