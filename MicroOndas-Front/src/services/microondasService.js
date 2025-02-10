import api from "./api";

export const aquecer = async (tempo, potencia, tipo) => {
    try {
        const response = await api.post("http://localhost:5000/api/microondas/aquecer", { tempo, potencia, tipo });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const adicionarProgramPreDefinido = async (tipo, alimento, tempo, potencia, caractere, instrucoes) => {
    try {
        const response = await api.post("http://localhost:5000/api/microondas/adicionar-aquecimento-pre-definido", {tipo, alimento, tempo, potencia, caractere, instrucoes});
        return response.data;
    } catch (error) {
        return null;
    }
}