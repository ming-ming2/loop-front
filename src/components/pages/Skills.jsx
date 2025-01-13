import React from "react";
import SkillForm from "../skills/SkillForm";
import SkillList from "../skills/SkillList";

const Skills = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <SkillForm />
            </div>
            <div>
              <SkillList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
