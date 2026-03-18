const { desc, eq } = require("drizzle-orm");
const {productsTable, db} = require("../useImports");
const { arrayStringified, stringifiedArrayToArray } = require("../utils");

class productsController {
    static async getProducts(req, res) {
        try {
            const products = await db.select().from(productsTable).orderBy(desc(productsTable.created_at));
            const productsWithParsedPoints = products.map(product => ({
                ...product,
                points: stringifiedArrayToArray(product.points)
            }));
            res.status(200).json(productsWithParsedPoints, { message: "Products fetched successfully" });


        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: error.message , message: "Failed to fetch products" });
        }
    }
    static async addProduct(req, res) {
        const { bg_color, title, content, icon, points } = req.body;
        if (!bg_color || !title || !content || !icon || !points) {
            return res.status(400).json({ error: "All fields are required" , message: "Failed to add product" });
        }

        try {
            const pointsStringified = arrayStringified(points);
           // transaction to ensure data integrity

           let newProduct;
           await db.transaction(async (trx) => {
               await trx.insert(productsTable).values({
                bg_color,
                title,
                content,
                icon,
                points: pointsStringified,
            })

            //fetch the newly added product to return in response
             newProduct = await db.select().from(productsTable).orderBy(desc(productsTable.created_at)).limit(1)
           });

            if (newProduct.length === 0) {
                return res.status(500).json({ error: "Failed to retrieve the newly added product" , message: "Failed to add product" });
            }
            res.status(201).json(newProduct[0], { message: "Product added successfully" });
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ error: error.message , message: "Failed to add product" });
        }
    }
    static async updateProduct(req, res) {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({ error: "Product ID is required" , message: "Failed to update product" });
        }
        const { bg_color, title, content, icon, points } = req.body;
        if (!bg_color || !title || !content || !icon || !points) {
            return res.status(400).json({ error: "All fields are required" , message: "Failed to update product" });
        }


        try {
            const pointsStringified = arrayStringified(points);
                
                let existingProduct;
                //  transaction to ensure data integrity
                await db.transaction(async (trx) => {
                    await trx.update(productsTable).set({
                    bg_color,
                    title,
                    content,
                    icon,
                    points: pointsStringified
                }).where(eq(productsTable.id, id));

                existingProduct = await trx.select().from(productsTable).where(eq(productsTable.id, id)).limit(1);
                })
                if (existingProduct.length === 0) {
                    return res.status(404).json({ error: "Product not found" , message: "Failed to update product" });
                }

                // parse points before sending response
                const productWithParsedPoints = {
                    ...existingProduct[0],
                    points: stringifiedArrayToArray(existingProduct[0].points)
                }
                return res.status(200).json({ message: "Product updated successfully" , data: productWithParsedPoints });
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ error: error.message , message: "Failed to update product" });
        }



    }
    static async deleteProduct(req, res) {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({ error: "Product ID is required" , message: "Failed to delete product" });
        }

        try {
            await db.delete(productsTable).where(eq(productsTable.id, id));
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ error: error.message , message: "Failed to delete product" });
        }
    }
}

module.exports = productsController;