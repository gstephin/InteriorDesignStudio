import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// In-memory storage for contact submissions when DB fails
const inMemorySubmissions: any[] = [];

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
      
      try {
        // Try to save to database
        const savedSubmission = await storage.createContactSubmission(submission);
        console.log("Contact submission saved to database:", submission.name, submission.email);
        return res.status(201).json(savedSubmission);
      } catch (dbError) {
        // If database fails, store in memory
        console.error("Database error saving contact submission:", dbError);
        
        const inMemSubmission = {
          id: inMemorySubmissions.length + 1,
          ...submission
        };
        
        inMemorySubmissions.push(inMemSubmission);
        console.log("Contact submission saved to memory:", JSON.stringify(inMemSubmission, null, 2));
        
        return res.status(201).json(inMemSubmission);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      console.error("Error processing contact submission:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to process your submission. Please try again." 
      });
    }
  });

  // API route to retrieve all contact submissions
  app.get("/api/contact", async (req, res) => {
    try {
      try {
        // Try to get from database
        const submissions = await storage.getContactSubmissions();
        return res.status(200).json(submissions);
      } catch (dbError) {
        console.error("Database error fetching submissions:", dbError);
        // Return in-memory submissions as fallback
        console.log("Returning in-memory submissions:", inMemorySubmissions.length);
        return res.status(200).json(inMemorySubmissions);
      }
    } catch (error) {
      console.error("Error retrieving contact submissions:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contact submissions." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
