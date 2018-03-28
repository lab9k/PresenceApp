import { Component, OnInit, Input } from '@angular/core';
import { Campus } from '../../../../../shared/models/campus.model';
import { AdminDataService } from '../../../admin.service';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  @Input() public campus: Campus;
  
  constructor(private adminService: AdminDataService) { }

  ngOnInit() {
  }

  delete() {
    this.adminService.deleteCampus(this.campus).subscribe();
    location.reload();
  }
}
