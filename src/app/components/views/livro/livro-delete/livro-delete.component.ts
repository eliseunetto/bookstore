import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { LivroService } from "./../livro.service";
import { Component, OnInit } from "@angular/core";
import { Livro } from "../livro.model";

@Component({
  selector: "app-livro-delete",
  templateUrl: "./livro-delete.component.html",
  styleUrls: ["./livro-delete.component.css"],
})
export class LivroDeleteComponent implements OnInit {
  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    autor: "",
    texto: "",
  };

  constructor(
    private service: LivroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((response) => {
      this.livro = response;
    });
  }

  delete(): void {
    this.service.delete(this.livro.id!).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("Livro apagado com sucesso!");
      },
      (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("ERRO ao apagar o Livro");
      }
    );
  }

  cancelar(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
