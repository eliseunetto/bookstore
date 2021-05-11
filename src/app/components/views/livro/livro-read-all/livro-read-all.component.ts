import { CategoriaService } from "./../../categoria/categoria.service";
import { ActivatedRoute, Router } from "@angular/router";

import { LivroService } from "./../livro.service";
import { Component, OnInit } from "@angular/core";
import { Categoria } from "../../categoria/categoria.model";
import { Livro } from "../livro.model";

@Component({
  selector: "app-livro-read-all",
  templateUrl: "./livro-read-all.component.html",
  styleUrls: ["./livro-read-all.component.css"],
})
export class LivroReadAllComponent implements OnInit {
  livros: Livro[] = [];

  id_cat: String = "";

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.findAllByCategoria();
  }

  findAllByCategoria(): void {
    this.service.findAllByCategoria(this.id_cat!).subscribe((resposta) => {
      this.livros = resposta;
      console.log(this.livros);
    });
  }

  navegarParaCriarLivro(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`]);
  }

  displayedColumns: string[] = ["id", "titulo", "ler-livro", "acao"];
}
