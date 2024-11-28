import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

async function main() {
    const homerSimpson = await prisma.driver.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: "Homer Simpson",
            description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
            vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
            review: "2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
            value: 2.5,
            minimumKm: 1
        }
    });

    const dominicToretto = await prisma.driver.upsert({
        where: { id: 2},
        update: {},
        create: {
            id: 2,
            name: "Dominic Toretto",
            description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
            vehicle: "Dodge Charger R/T 1970 modificado",
            review: "4/5 Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
            value: 5,
            minimumKm: 5
        }
    });

    const jamesBond = await prisma.driver.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: "James Bond",
            description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
            vehicle: "Aston Martin DB5 clássico",
            review: "5/5 Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
            value: 10,
            minimumKm: 10
        }
    })

    console.log({ homerSimpson, dominicToretto, jamesBond});
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })