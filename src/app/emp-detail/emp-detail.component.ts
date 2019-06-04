import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { Employee,Page,PagedData } from './emp-detail.model';
import { EmployeeServiceService } from './employee-service.service';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss']
})
export class EmpDetailComponent implements AfterViewInit {
  page = new Page();
  rows = new Array<Employee>();
  cache: any = {};

  @ViewChild('myTable') table;

  private isLoading: boolean = false;

  constructor(private serverResultsService: EmployeeServiceService) {
    this.setPage({ offset: 0, pageSize: 30 });
  }

  ngAfterViewInit() {
    this.table.bodyComponent.updatePage = function (direction: string): void {
      let offset = this.indexes.first / this.pageSize;

      if (direction === 'up') {
        offset = Math.ceil(offset);
      } else if (direction === 'down') {
        offset = Math.floor(offset);
      }

      if (direction !== undefined && !isNaN(offset)) {
        this.page.emit({ offset });
      }
    }
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;

      let rows = this.rows;
      if (rows.length !== pagedData.page.totalElements) {
        rows = Array.apply(null, Array(pagedData.page.totalElements));
        rows = rows.map((x, i) => this.rows[i]);
      }

      // calc start
      const start = this.page.pageNumber * this.page.size;

      // set rows to our new rows
      pagedData.data.map((x, i) => rows[i + start] = x);
      this.rows = rows;
      this.isLoading = false;
    });
  }

}
