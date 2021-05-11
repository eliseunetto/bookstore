import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { LivroService } from "../livro.service";
import { Livro } from "../livro.model";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    autor: "",
    texto: "",
  };

  titulo = new FormControl("", [Validators.minLength(3)]);
  autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  constructor(
    private service: LivroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("Livro criado com sucesso!");
      },
      (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("ERRO ao tentar criar Livro.");
      }
    );
  }

  cancelar(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 caracteres";
    }

    if (this.autor.invalid) {
      return "O campo AUTOR deve conter entre 3 e 100 caracteres";
    }

    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 10 e 2.000.000 caracteres";
    }
    return false;
  }
}
