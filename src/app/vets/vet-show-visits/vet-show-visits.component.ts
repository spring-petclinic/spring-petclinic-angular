import { Observable } from 'rxjs';
import { VisitService } from './../../visits/visit.service';
import { Visit } from './../../visits/visit';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vet-show-visits',
  templateUrl: './vet-show-visits.component.html',
  styleUrls: ['./vet-show-visits.component.css']
})
export class VetShowVisitsComponent implements OnInit {

  plannedVisits: Observable<Visit[]>;
  pastVisits: Observable<Visit[]>;

  constructor(private visitService: VisitService) { }

  ngOnInit(): void {
    this.plannedVisits = this.visitService.getVisits();
    this.pastVisits = this.visitService.getVisits();
  }

}
