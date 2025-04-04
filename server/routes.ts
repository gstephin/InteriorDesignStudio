import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Add submission time
      const submission = {
        ...validatedData,
        submittedAt: new Date().toISOString(),
      };
      
      await storage.createContactSubmission(submission);
      
      return res.status(200).json({ 
        success: true, 
        message: "Contact submission received successfully." 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to process your submission. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
