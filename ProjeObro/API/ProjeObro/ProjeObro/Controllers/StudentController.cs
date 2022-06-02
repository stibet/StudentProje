using Microsoft.AspNetCore.Mvc;
using ProjeObro.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;



namespace ProjeObro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        string result;


        [HttpGet]
        public List<Student> OgrenciGetir()
        {
            List<Student> studentList = new List<Student>();

            string[] lines = System.IO.File.ReadAllLines(@"C:\Users\suhey\OneDrive\Masaüstü\ProjeObro\db.txt");
            foreach (string line in lines)
            {
                string[] hobiListe = line.Split(' ');

                Student students = new Student();
                int x = Int32.Parse(hobiListe[0]);
                students.Id = x;
                students.Name = hobiListe[1];
                students.LastName = hobiListe[2];
                bool myBool = Convert.ToBoolean(hobiListe[3]);
                students.Status = myBool;
                studentList.Add(students);

                studentList.Sort((x, y) => string.Compare(x.Name, y.Name));

            }
           

            return studentList;

        }

        [HttpGet("{id}")]
        public List<Student> GetId(int id)
       {
            string[] lines = System.IO.File.ReadAllLines(@"C:\Users\suhey\OneDrive\Masaüstü\ProjeObro\db.txt");
            List<Student> studentList = new List<Student>();
            if (lines.Length > 0) { 
            foreach (string s in lines)
            {
                var ik = string.Concat(s.TakeWhile(c => c != ' '));
                if (ik == id.ToString())
                {
                    result = s;
                }
            }
            }
            return studentList;
        }


        [HttpPost]
        public void Post(Student model)
        {
            //string[] lines = System.IO.File.ReadAllLines(@"C:\Users\suhey\OneDrive\Masaüstü\ProjeObro\db.txt");
            string filePath = @"C:\Users\suhey\OneDrive\Masaüstü\ProjeObro\db.txt";
            

            bool control =true;
            List<Student> dizi = OgrenciGetir();
            for (int i = 0; i < dizi.Count; i++)
            {
                if (dizi[i].Id == model.Id)
                {
                    control = false;

                }

            }
                    
            if (control == true)
            {
                dizi.Add(model);
                for (int i = 0; i < dizi.Count; i++)
                {

                    dizi.Sort((x, y) => string.Compare(x.Name, y.Name));

                }
                StreamWriter sw = new StreamWriter(filePath);

                for (int i = 0; i < dizi.Count; i++)
                {

                    sw.WriteLine(dizi[i].Id + " " + dizi[i].Name + " " + dizi[i].LastName + " " + dizi[i].Status);

                }

                sw.Close();
            }
        

        }
        
        [HttpPut]
        public void Put(Student model)
        {

            string filePath = @"C:\Users\suhey\OneDrive\Masaüstü\ProjeObro\db.txt";


            List<Student> dizi = OgrenciGetir();
            string a;
            for (int i = 0; i < dizi.Count; i++)
            {
                if (dizi[i].Id == model.Id)
                {
                    //b = dizi[i].Id.ToString().Replace(dizi[i].Id.ToString(), model.Id.ToString());
                    //dizi[i].Id = int.Parse(b);
                    dizi[i].Name = dizi[i].Name.Replace(dizi[i].Name, model.Name);
                    dizi[i].LastName = dizi[i].LastName.Replace(dizi[i].LastName, model.LastName);
                    a = dizi[i].Status.ToString().Replace(dizi[i].Status.ToString(), model.Status.ToString());
                    dizi[i].Status = bool.Parse(a);


                }

            }

            StreamWriter sw = new StreamWriter(filePath);
            for (int i = 0; i < dizi.Count; i++)
            {
                dizi.Sort((x, y) => string.Compare(x.Name, y.Name));
                sw.WriteLine(dizi[i].Id + " " + dizi[i].Name + " " + dizi[i].LastName + " " + dizi[i].Status);

            }
            sw.Close();


        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            string filePath = @"C:\Users\suhey\OneDrive\Masaüstü\ProjeObro\db.txt";
            string remove = "remove";
            List<Student> dizi = OgrenciGetir();

            for (int i = 0; i < dizi.Count; i++)
            {
                if (dizi[i].Id == id)
                {
                    dizi[i].Name = dizi[i].Name.Replace(dizi[i].Name, remove);
                }

            }
            StreamWriter sw = new StreamWriter(filePath);
            for (int i = 0; i < dizi.Count; i++)
            {
                if (dizi[i].Name != "remove")
                {
                    sw.WriteLine(dizi[i].Id + " " + dizi[i].Name + " " + dizi[i].LastName + " " + dizi[i].Status);

                }

            }
            sw.Close();
        }
    }
}
