import cors from "cors";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, "dist")));

function validateRegistration(data) {
  if (data.personType === "pessoa-fisica") {
    if (!data.name || !data.cpf || !data.birthDay) {
      return "Campos obrigatórios para pessoa física: name, cpf, birthDay.";
    }
  } else if (data.personType === "pessoa-juridica") {
    if (!data.companyName || !data.cnpj || !data.openDate) {
      return "Campos obrigatórios para pessoa jurídica: companyName, cnpj, openDate.";
    }
  } else {
    return "Tipo de pessoa inválido.";
  }

  return null;
}

// Rota catch-all para retornar index.html para qualquer rota que não seja API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/registration", (req, res) => {
  const validationError = validateRegistration(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  console.log("Dados recebidos:", req.body);

  return res.status(201).json({
    message: "Seu cadastro foi realizado com sucesso!",
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
