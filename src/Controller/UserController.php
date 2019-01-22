<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class UserController extends AbstractController
{
    /**
     * @Route("/user/list", methods={"GET"}), name="user_index")
     */
    public function index(Request $request): Response
    {
        $repository = $this->getDoctrine()->getRepository(User::class);
        $users = $repository->findAll();
        return $this->render('user/index.html.twig', [
            'users' => $users,
        ]);
    }

    /**
     * @Route("/user/add", methods={"GET", "POST"}, name="user_add")
     * @Route("/user/{id}/edit", methods={"GET", "POST"}, name="user_edit")
     */
    public function edit(Request $request, int $id = 0): Response
    {
        if (empty($id)) {
            $user = new User();
            $title = "Новый пользователь";
        } else {
            $user = $this->getDoctrine()
                ->getRepository(User::class)
                ->find($id);

            if (empty($user)) {
                throw $this->createNotFoundException(
                    "Пользователь не найден."
                );
            }
            $title = "Изменение пользователя";
        }
        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($form->get('delete')->isClicked()) {
                return $this->redirectToRoute('user_delete', ['id' => $id]);
            }
            $user = $form->getData();
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('app_user_index');
        }
        return $this->render('user/edit.html.twig', [
            'page_title' => $title,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/user/{id}/delete", methods={"GET", "POST"}, name="user_delete")
     */
    public function delete(Request $request, int $id): Response {
        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->find($id);

        if (empty($user)) {
            throw $this->createNotFoundException(
                "Пользователь не найден."
            );
        }

        $form = $this->createFormBuilder()
            ->add('cancel', SubmitType::class, [
                'label' => 'Отменить',
                'attr' => ['class' => 'btn-info'],
            ])
            ->add('confirm', SubmitType::class, [
                'label' => 'Удалить',
                'attr' => ['class' => 'btn-danger'],
            ])
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->get('confirm')->isClicked()) {
                $entityManager->remove($user);
                $entityManager->flush();
                return $this->redirectToRoute('app_user_index');
            }
            if ($form->get('cancel')->isClicked()) {
                return $this->redirectToRoute('user_edit', ['id' => $id]);
            }
        }

        return $this->render('user/edit.html.twig', [
            'page_title' => "Вы действительно хотите удалить пользователя?",
            'form' => $form->createView(),
        ]);
    }
}

