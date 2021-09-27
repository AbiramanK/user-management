import { ColumnDirective, ColumnsDirective, TreeGridComponent } from '@syncfusion/ej2-react-treegrid';
import { Filter, Inject, Page, Sort, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import * as React from 'react';
import './App.css';
import { sortData } from './data';

export const App = () => {

  const pageOptions = { pageSize: 10 };
  const sortingOptions = {
    columns: [
      { field: 'Category', direction: 'Ascending' },
      { field: 'orderName', direction: 'Ascending' }
    ]
  };
  const filterSettings = {};
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

  return (
    <TreeGridComponent
      dataSource={sortData}
      treeColumnIndex={1}
      childMapping='subtasks'
      allowPaging={true}
      allowSorting={true}
      allowFiltering={true}
      filterSettings={filterSettings}
      editSettings={{
        allowAdding: true,
        allowDeleting: true,
        allowEditing: true,
        mode: 'Cell'
      }}
      toolbar={toolbarOptions}
      pageSettings={pageOptions}
    >
      <ColumnsDirective>
        <ColumnDirective field='name' headerText='Name' width='150' />
        <ColumnDirective field='phone' headerText='Phone' width='170' type="number"/>
        <ColumnDirective field='email' headerText='Email' width='130' textAlign='Right' type='date' />
        <ColumnDirective field='address' headerText='Address' width='100' textAlign='Right' />
        <ColumnDirective field='postalZip' headerText='Postal Zip' width='150' type='number'/>
        <ColumnDirective field='region' headerText='Region' width='150' />
        <ColumnDirective field='country' headerText='Country' width='150' />
        <ColumnDirective field='list' headerText='List' width='150' />
        <ColumnDirective field='text' headerText='Message' width='150' />
        <ColumnDirective field='numberrange' headerText='Number Range' width='150' />
        <ColumnDirective field='currency' headerText='Currency' width='150' />
        <ColumnDirective field='alphanumeric' headerText='Alpha Numeric' width='150' />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Filter, Edit, Toolbar]} />
    </TreeGridComponent>
  )
}

export default App;