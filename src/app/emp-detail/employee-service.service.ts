import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Employee, Page, PagedData } from './emp-detail.model';
import { Observable } from 'rxjs';
import { companyData } from '../assets/data/company';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  public getResults(page: Page): Observable<PagedData<Employee>> {
    return Observable.of(companyData).delay(100).map(data => this.getPagedData(page));
  }

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
   */
  private getPagedData(page: Page): PagedData<Employee> {
    let pagedData = new PagedData<Employee>();
    page.totalElements = companyData.length;
    page.totalPages = page.totalElements / page.size;
    let start = page.pageNumber * page.size;
    let end = Math.min((start + page.size), page.totalElements);
    for (let i = start; i < end; i++) {
      let jsonObj = companyData[i];
      let employee = new Employee(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
      pagedData.data.push(employee);
    }
    pagedData.page = page;
    return pagedData;
  }
}
