<template>
  <div>
    <h1>Report</h1>
    <div class="controls-row">
      <CDropdown>
        <CDropdownToggle caret color="primary" variant="outline">
          <CIcon name="cil-list"/>
          {{ selectedReportType || 'Report Type' }}
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem @click="selectedReportType = 'Monthly'">Monthly</CDropdownItem>
          <CDropdownItem @click="selectedReportType = 'Yearly'">Yearly</CDropdownItem>
          <!-- Add more options as needed -->
        </CDropdownMenu>
      </CDropdown>
      <CDropdown inline class="month-dropdown" v-bind:disabled="selectedReportType !== 'Monthly'">
        <CDropdownToggle caret color="primary" variant="outline"
                         :class="{ 'disabled-dropdown': selectedReportType !== 'Monthly' }">
          <CIcon name="cil-calendar"/>
          {{ selectedMonth || 'Month' }}
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem @click="setMonth('January', 1)">January</CDropdownItem>
          <CDropdownItem @click="setMonth('February', 2)">February</CDropdownItem>
          <CDropdownItem @click="setMonth('March', 3)">March</CDropdownItem>
          <CDropdownItem @click="setMonth('April', 4)">April</CDropdownItem>
          <CDropdownItem @click="setMonth('May', 5)">May</CDropdownItem>
          <CDropdownItem @click="setMonth('June', 6)">June</CDropdownItem>
          <CDropdownItem @click="setMonth('July', 7)">July</CDropdownItem>
          <CDropdownItem @click="setMonth('August', 8)">August</CDropdownItem>
          <CDropdownItem @click="setMonth('September', 9)">September</CDropdownItem>
          <CDropdownItem @click="setMonth('October', 10)">October</CDropdownItem>
          <CDropdownItem @click="setMonth('November', 11)">November</CDropdownItem>
          <CDropdownItem @click="setMonth('December', 12)">December</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CDropdown inline class="year-dropdown" v-bind:disabled="!selectedReportType">
        <CDropdownToggle caret color="primary" variant="outline" :class="{ 'disabled-dropdown': !selectedReportType }">
          <CIcon name="cil-calendar"/>
          {{ selectedYear || 'Year' }}
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem @click="selectedYear = new Date().getFullYear() - 0">{{
              new Date().getFullYear() - 0
            }}
          </CDropdownItem>
          <CDropdownItem @click="selectedYear = new Date().getFullYear() - 1">{{
              new Date().getFullYear() - 1
            }}
          </CDropdownItem>
          <CDropdownItem @click="selectedYear = new Date().getFullYear() - 2">{{
              new Date().getFullYear() - 2
            }}
          </CDropdownItem>
          <CDropdownItem @click="selectedYear = new Date().getFullYear() - 3">{{
              new Date().getFullYear() - 3
            }}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CButton class="ml-3" color="secondary" @click="selectCurrentDate">
        <CIcon name="cil-calendar"/>
        Current Month and Year
      </CButton>
      <div class="button-container">
        <CButton color="primary" @click="generateReport" v-bind:disabled="isGenerateDisabled">
          <CIcon name="cil-settings"/>
          Generate
        </CButton>
      </div>
    </div>
    <!-- Rest of the code remains the same -->
    <CRow v-if="showMonthlyWidget" class="mt-4">
      <CCol :sm="6">
        <CWidgetStatsB
          class="mb-3"
          :progress="{ color: 'success', value: (total_amount_paid / total_rent_amount) * 100 }"
        >
          <template #title>Total Rent Amount Collected</template>
          <template #value>${{ total_amount_paid }} / ${{ total_rent_amount }}</template>
        </CWidgetStatsB>
      </CCol>

      <CCol :sm="6">
        <CWidgetStatsB
          class="mb-3"
          :progress="{ color: 'success', value: (transaction_count / leased_apartment_count) * 100 }"
        >
          <template #title>Leased Apartment Rent Collected</template>
          <template #value>{{ transaction_count }} / {{ leased_apartment_count }}</template>
        </CWidgetStatsB>
      </CCol>
    </CRow>

    <CTable align="middle" class="mb-0 border mt-2" hover responsive v-if="report">
      <CRow>
        <CCol>
          <CInput placeholder="First Name" v-model="filters.firstName"/>
        </CCol>
        <CCol>
          <CInput placeholder="Last Name" v-model="filters.lastName"/>
        </CCol>
        <CCol>
          <CInput placeholder="Apartment" v-model="filters.apartmentNumber"/>
        </CCol>
        <!-- Add more input fields as needed -->
      </CRow>
      <CTableHead class="text-nowrap">
        <CTableRow>
          <CTableHeaderCell>Apartment #</CTableHeaderCell>
          <CTableHeaderCell>First Name</CTableHeaderCell>
          <CTableHeaderCell>Last Name</CTableHeaderCell>
          <CTableHeaderCell>Amount Paid</CTableHeaderCell>
          <CTableHeaderCell>Date</CTableHeaderCell>
          <CTableHeaderCell>Rented</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="record in report" :key="record.email">
          <CTableDataCell>{{ record.apartment_number }}</CTableDataCell>
          <CTableDataCell>{{ record.first_name }}</CTableDataCell>
          <CTableDataCell>{{ record.last_name }}</CTableDataCell>
          <CTableDataCell :class="{ 'text-danger': !record.amount_paid }">
            {{ record.amount_paid ? record.amount_paid : 'Unpaid' }}
          </CTableDataCell>
          <CTableDataCell>{{ record.date }}</CTableDataCell>
          <CTableDataCell>{{ record.is_rented ? 'Yes' : 'No' }}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>

<script>

import {CWidgetStatsB} from "@coreui/vue";

export default {
  name: 'ReportsComponent',
  components: {
    CWidgetStatsB,
  },
  data() {
    return {
      selectedReportType: '',
      selectedMonth: '',
      selectedYear: '',
      report: null,
      pageSize: 10,
      pageNumber: 1,
      totalRecords: 0,
      currentPage: 1,
      total_rent_amount: 0,
      total_amount_paid: 0,
      showMonthlyWidget: false,
      leased_apartment_count: 0,
      transaction_count: 0,
      filters: {
        firstName: '',
        lastName: '',
        apartmentNumber: '',
      }
    };
  },
  computed: {
    isGenerateDisabled() {
      if (this.selectedReportType === 'Monthly') {
        return !(this.selectedMonth && this.selectedYear);
      } else if (this.selectedReportType === 'Yearly') {
        return !this.selectedYear;
      } else {
        return true;
      }
    },
  },
  methods: {
    setMonth(monthName, monthNumber) {
      this.selectedMonth = monthName;
      this.selectedMonthNumber = monthNumber;
    },
    selectCurrentDate() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // getMonth() returns a zero-based value (where zero indicates the first month of the year)
      const currentYear = currentDate.getFullYear();

      this.setMonth(this.getMonthName(currentMonth), currentMonth);
      this.selectedYear = currentYear;
    },
    getMonthName(monthNumber) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthNames[monthNumber - 1];
    },
    async changePage(newPage) {
      this.currentPage = newPage;
      await this.generateReport(); // Generate the report for the new page
    },
    async generateReport() {
      if (this.selectedReportType === 'Monthly') {
        const requestData = {
          month: this.selectedMonthNumber,
          year: this.selectedYear,
          page_size: this.pageSize,
          page_number: this.pageNumber,
          first_name: '', // Add the actual value
          last_name: '', // Add the actual value
          apartment_number: '', // Add the actual value
        };

        // eslint-disable-next-line no-undef
        const response = await fetch(`${process.env.VUE_APP_BASE_URL}/monthly-report/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const data = await response.json();
          this.report = data.report; // Assign the 'report' property of the response to 'this.report'
          this.pageSize = data.page_size; // Assign the 'page_size' property of the response to 'this.pageSize'
          this.pageNumber = data.page_number; // Assign the 'page_number' property of the response to 'this.pageNumber'
          this.totalRecords = data.total_records;
          this.total_rent_amount = data.total_rent_amount;
          this.total_amount_paid = data.total_amount_paid;
          this.showMonthlyWidget = true;
          this.leased_apartment_count = data.leased_apartment_count;
          this.transaction_count = data.transaction_count;
        } else {
          this.showMonthlyWidget = false;
          console.error('API request failed', response);
        }
      }
    },
  },
};
</script>

<style scoped>
.controls-row {
  display: flex;
  align-items: center;
}

.month-dropdown {
  margin-left: 20px;
}

.button-container {
  margin-left: auto;
}

.year-dropdown {
  margin-left: 10px;
}

.disabled-dropdown {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #ccc !important;
}
</style>
