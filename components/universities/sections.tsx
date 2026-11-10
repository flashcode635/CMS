"use client";

import { Component, type ReactNode } from "react";
import ErrorPopup from "@/components/ui/ErrorPopup";
import { getOptions } from "./univNav";

type SectionErrorBoundaryProps = {
    sectionName: string;
    children: ReactNode;
};

type SectionErrorBoundaryState = {
    error: Error | null;
};

class SectionErrorBoundary extends Component<
    SectionErrorBoundaryProps,
    SectionErrorBoundaryState
> {
    state: SectionErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
        return { error };
    }

    render() {
        const { error } = this.state;

        if (error) {
            return (
                <ErrorPopup
                    message={`Error in ${this.props.sectionName}: ${error.message}`}
                />
            );
        }

        return this.props.children;
    }
}

export default function UnivSections({ universityName }: { universityName?: string }) {
    const options = getOptions(universityName);
    return(
        <>
            {options.map((option) => (
                <div id={option.href.slice(1)} key={option.id}>
                    <SectionErrorBoundary sectionName={option.name}>
                        {option.component ?? null}
                    </SectionErrorBoundary>
                </div>
            
            ))}
        </>
    )
}