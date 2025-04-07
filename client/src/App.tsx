import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AdminPage from "@/pages/admin";
import BlogDetail from "@/pages/blog-detail";
import "./fonts.css";

function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {/* Add pages below */}
        <Route path="/" component={HomePage} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route path="/admin" component={AdminPage} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
