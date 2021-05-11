import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent implements OnInit {
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
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((response) => {
      this.livro = response;
    });
  }

  update(): void {
    this.service.update(this.livro).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("Livro atualizado com sucesso!");
      },
      (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("ERRO ao atualizar livro.");
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
