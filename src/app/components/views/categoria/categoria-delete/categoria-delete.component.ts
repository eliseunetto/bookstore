import { Categoria } from "./../categoria.model";
import { CategoriaService } from "./../categoria.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-categoria-delete",
  templateUrl: "./categoria-delete.component.html",
  styleUrls: ["./categoria-delete.component.css"],
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria = {
    id: "",
    nome: "",
    descricao: "",
  };

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria.id = resposta.id;
      this.categoria.nome = resposta.nome;
      this.categoria.descricao = resposta.descricao;
    });
  }

  delete(): void {
    this.service.delete(this.categoria.id!).subscribe(
      (resposta) => {
        this.router.navigate(["categorias"]);
        this.service.message("Categoria apagada com sucesso!");
      },
      (err) => {
        this.service.message(err.error.message);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
