import { Categoria } from "../categoria.model";
import { CategoriaService } from "./../categoria.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-categoria-read",
  templateUrl: "./categoria-read.component.html",
  styleUrls: ["./categoria-read.component.css"],
})
export class CategoriaReadComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.categorias = resposta;
    });
  }

  navegarParaCategoriaCriate() {
    this.router.navigate(["categorias/create"]);
  }

  displayedColumns: string[] = ["id", "nome", "descricao", "livros", "acao"];
}
