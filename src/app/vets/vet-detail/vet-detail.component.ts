import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Vet } from "../vet";
import { VetService } from "../vet.service";

@Component({
  selector: "app-vet-detail",
  templateUrl: "./vet-detail.component.html",
  styleUrls: ["./vet-detail.component.css"],
})
export class VetDetailComponent implements OnInit {
  errorMessage: string;
  vet: Vet;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vetService: VetService
  ) {
    this.vet = {} as Vet;
  }

  ngOnInit() {
    const vetId = this.route.snapshot.params.id;
    this.vetService.getVetById(vetId).subscribe(
      (vet) => (this.vet = vet),
      (error) => (this.errorMessage = error as any)
    );
  }

  onSelectOwner(ownerId: number) {
    this.router.navigate(["/owners", ownerId]);
  }
}
