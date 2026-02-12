package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	
	// Load templates
	r.LoadHTMLGlob("templates/*")
	
	// Static files
	r.Static("/static", "./static")
	
	// SEO files
	r.StaticFile("/robots.txt", "./static/robots.txt")
	r.StaticFile("/sitemap.xml", "./static/sitemap.xml")
	
	// Routes
	r.GET("/", indexHandler)
	r.GET("/educacao", educacaoHandler)
	r.GET("/simulador", simuladorHandler)
	r.GET("/contato", contatoHandler)
	r.POST("/contato", contatoPostHandler)
	r.GET("/termos-uso", termosUsoHandler)
	r.GET("/politica-privacidade", politicaPrivacidadeHandler)
	
	r.Run(":8080")
}

func indexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "base.html", gin.H{
		"title": "Farol do Investimento - Aprenda a Investir em Renda Fixa | Curso + Simulador",
		"template": "index",
		"year": time.Now().Year(),
		"canonical": "/",
	})
}

func educacaoHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "base.html", gin.H{
		"title": "Curso de Renda Fixa Online - R$ 19,90/mês | CDB, Tesouro Direto e Mais",
		"template": "educacao",
		"year": time.Now().Year(),
		"canonical": "/educacao",
	})
}

func simuladorHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "simulador-completo.html", gin.H{
		"title": "Simulador de Renda Fixa Gratuito - Compare CDB, Tesouro e Poupança",
		"year": time.Now().Year(),
		"canonical": "/simulador",
	})
}

func contatoHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "base.html", gin.H{
		"title": "Contato - Farol do Investimento | Tire suas Dúvidas sobre Renda Fixa",
		"template": "contato",
		"year": time.Now().Year(),
		"canonical": "/contato",
	})
}

func contatoPostHandler(c *gin.Context) {
	nome := c.PostForm("nome")
	email := c.PostForm("email")
	telefone := c.PostForm("telefone")
	interesse := c.PostForm("interesse")
	mensagem := c.PostForm("mensagem")
	
	// Aqui você pode processar os dados (salvar em DB, enviar email, etc.)
	_ = nome
	_ = email
	_ = telefone
	_ = interesse
	_ = mensagem
	
	c.Redirect(http.StatusFound, "/contato?success=1")
}

func termosUsoHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "base.html", gin.H{
		"title": "Termos de Uso - Farol do Investimento",
		"template": "termos-uso",
		"year": time.Now().Year(),
		"canonical": "/termos-uso",
	})
}

func politicaPrivacidadeHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "base.html", gin.H{
		"title": "Política de Privacidade - Farol do Investimento",
		"template": "politica-privacidade",
		"year": time.Now().Year(),
		"canonical": "/politica-privacidade",
	})
}