import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/main.js";

/**
 * Normalizes a string or object shipping address to the new object shape.
 * @param {string | object} shippingAddress
 * @returns {object} { street, city, state, zip }
 */
const normalizeShippingAddress = (shippingAddress) => {
  if (!shippingAddress) {
    return { street: "", city: "", state: "", zip: "" };
  }

  if (typeof shippingAddress === "string") {
    const [street = "", city = "", state = "", zip = ""] =
      shippingAddress.split(", ");
    return { street, city, state, zip };
  }

  return {
    street: shippingAddress.street || "",
    city: shippingAddress.city || "",
    state: shippingAddress.state || "",
    zip: shippingAddress.zip || shippingAddress.zipCode || "",
  };
};

/**
 * Migrates all user documents to use object-shaped shippingAddress.
 * Only updates docs that have a string shippingAddress.
 */
export const migrateUserShippingAddresses = async () => {
  try {
    console.log("Starting user shippingAddress migration...");
    const usersRef = collection(db, "users");
    const userDocs = await getDocs(usersRef);

    let migratedCount = 0;
    for (const userDoc of userDocs.docs) {
      const data = userDoc.data();
      if (data.shippingAddress && typeof data.shippingAddress === "string") {
        const normalized = normalizeShippingAddress(data.shippingAddress);
        await updateDoc(doc(db, "users", userDoc.id), {
          shippingAddress: normalized,
        });
        migratedCount++;
        console.log(`Migrated user ${userDoc.id}`);
      }
    }
    console.log(`User migration complete. Updated ${migratedCount} documents.`);
    return migratedCount;
  } catch (error) {
    console.error("Error migrating user shippingAddress:", error);
    throw error;
  }
};

/**
 * Migrates all order documents (both from subcollection and embedded) to use object-shaped shippingAddress.
 * Only updates docs that have a string shippingAddress.
 */
export const migrateOrderShippingAddresses = async () => {
  try {
    console.log("Starting order shippingAddress migration...");
    let migratedCount = 0;

    // Migrate subcollection orders (users/{uid}/orders/{orderId})
    const usersRef = collection(db, "users");
    const userDocs = await getDocs(usersRef);

    for (const userDoc of userDocs.docs) {
      const ordersRef = collection(db, "users", userDoc.id, "orders");
      const orderDocs = await getDocs(ordersRef);

      for (const orderDoc of orderDocs.docs) {
        const data = orderDoc.data();
        if (data.shippingAddress && typeof data.shippingAddress === "string") {
          const normalized = normalizeShippingAddress(data.shippingAddress);
          await updateDoc(doc(db, "users", userDoc.id, "orders", orderDoc.id), {
            shippingAddress: normalized,
          });
          migratedCount++;
          console.log(`Migrated order ${orderDoc.id} in user ${userDoc.id}`);
        }
      }
    }

    // Migrate legacy top-level orders (if they exist)
    try {
      const legacyOrdersRef = collection(db, "orders");
      const legacyOrderDocs = await getDocs(legacyOrdersRef);

      for (const orderDoc of legacyOrderDocs.docs) {
        const data = orderDoc.data();
        if (data.shippingAddress && typeof data.shippingAddress === "string") {
          const normalized = normalizeShippingAddress(data.shippingAddress);
          await updateDoc(doc(db, "orders", orderDoc.id), {
            shippingAddress: normalized,
          });
          migratedCount++;
          console.log(`Migrated legacy order ${orderDoc.id}`);
        }
      }
    } catch (error) {
      console.warn(
        "No legacy top-level orders found or permission denied:",
        error.message,
      );
    }

    console.log(
      `Order migration complete. Updated ${migratedCount} documents.`,
    );
    return migratedCount;
  } catch (error) {
    console.error("Error migrating order shippingAddress:", error);
    throw error;
  }
};

/**
 * Runs both user and order shippingAddress migrations.
 * Safe to call multiple times; only updates docs with string shippingAddress.
 */
export const runMigration = async () => {
  try {
    console.log("=== Starting shippingAddress migration ===");
    const userCount = await migrateUserShippingAddresses();
    const orderCount = await migrateOrderShippingAddresses();
    console.log(
      `=== Migration complete: ${userCount + orderCount} total documents updated ===`,
    );
    return { userCount, orderCount };
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
};
