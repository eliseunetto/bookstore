import { CategoriaService } from "./../../categoria/categoria.service";
import { ActivatedRoute } from "@angular/router";

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

  constructor(private service: LivroService, private route: ActivatedRoute) {}

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

  displayedColumns: string[] = ["id", "titulo", "ler-livro", "acao"];
}
