const bcrypt = require("bcrypt");
const { PrismaClient, Gender } = require("@prisma/client");
const prisma = new PrismaClient();

const userId = {
    id: "clziqqbgy000108l7dmts0vng",
};

async function seedUsers() {
    console.log("Seeding users...");
    try {
        const hashedPassword = await bcrypt.hash("AhRX8LioQKpMTg7", 10);
        await prisma.user.create({
            data: {
                id: userId.id,
                name: "John Doe",
                email: "example@example.com",
                image: "https://avatars.githubusercontent.com/u/106351230?v=4&size=64",
                password: hashedPassword,
            },
        });
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
}

async function seedProducts() {
    console.log("Seeding products...");
    try {
        await prisma.product.createMany({
            data: [
                {
                    id: "cm147w0q6000008juf4sje2jh",
                    name: "Product 1",
                    description: "This is product 1",
                    published: true,
                    price: 100,
                    slug: "product-1-1",
                    categoryId: "cm148xsva000008la0ax99gne"
                },
                {
                    id: "cm147z8ux000208jugn2jgpws",
                    name: "Product 2",
                    description: "This is product 2",
                    published: true,
                    price: 100,
                    slug: "product-2-1",
                    categoryId: "cm148xzco000108la4yre0lj3"
                }
            ],
        });
    } catch (error) {
        console.error("Error seeding products:", error);
        throw error;
    }
}

async function seedCategories() {
    console.log("Seeding categories...");
    try {
        await prisma.category.createMany({
            data: [
                {
                    id: "cm148xsva000008la0ax99gne",
                    name: "Tops",
                    gender: Gender.MEN,
                    slug: "tops-1",
                },
                {
                    id: "cm148xzco000108la4yre0lj3",
                    name: "Bottoms",
                    gender: Gender.MEN,
                    slug: "bottoms-1",
                }
            ],
        });
    } catch (error) {
        console.error("Error seeding categories:", error);
        throw error;
    }
}

async function seedProductVariant() {
    console.log("Seeding product variants...");
    try {
        await prisma.productVariant.createMany({
            data: [
                {
                    id: "cm14b7m8q000108mda43e0m8j",
                    color: 'Green',
                    price: 100,
                    size: 'M',
                    stock: 50,
                    productId: 'cm147w0q6000008juf4sje2jh',
                  },
                  {
                    id: "cm14b7xkh000208md1ok8ex7l",
                    color: 'Red',
                    price: 80,
                    size: 'XXL',
                    stock: 30,
                    productId: 'cm147w0q6000008juf4sje2jh',
                  },
            ],
        });
    } catch (error) {
        console.error("Error seeding product variants:", error);
        throw error;
    }
}

async function seedProductImages() {
    console.log("Seeding product images...");
    try {
        await prisma.productImage.createMany({
            data: [
                {
                    url: 'https://placehold.co/600x400',
                    variantId: 'cm14b7m8q000108mda43e0m8j',
                  },
                  {
                    url: 'https://placehold.co/600x400',
                    variantId: 'cm14b7m8q000108mda43e0m8j',
                  },
            ],
        });
    } catch (error) {
        console.error("Error seeding product images:", error);
        throw error;
    }
}

async function main() {
    // Clear existing data
    console.log("Deleting existing data ...");
    // await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Seed data
    console.log("Start seeding ...");
    // await seedUsers();
    await seedCategories();
    await seedProducts();
    await seedProductVariant();
    await seedProductImages();

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
